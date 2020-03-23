import React, { Fragment } from 'react';
import Select from 'Components/Shared/Select/Select';
import './ProcessesMenu.scss';
import { Selection } from 'jsplumbtoolkit';

const HARDCODED_PROCESSES = [
  {
    name: 'First process',
    packages: [
      {
        value: '1_pack1',
        label: 'Package 1'
      },
      {
        value: '1_pack2',
        label: 'Package 2'
      },
      {
        value: '1_pack3',
        label: 'Package 3'
      },
      {
        value: '1_pack4',
        label: 'Package 4'
      }
    ]
  },
  {
    name: 'Second process',
    packages: [
      {
        value: '2_pack1',
        label: 'Package 1'
      },
      {
        value: '2_pack2',
        label: 'Package 2'
      },
      {
        value: '2_pack3',
        label: 'Package 3'
      },
      {
        value: '2_pack4',
        label: 'Package 4'
      }
    ]
  }
];

const formatPackages = (processes: any): any => {
  return Object.values(processes).reduce((acc: any, curr: any) => {
    return {
      ...acc,
      [curr.name]: curr.packages
    };
  }, {});
};

class ProcessesMenu extends React.Component<any> {
  state = {
    selectedPackages: formatPackages(HARDCODED_PROCESSES)
  }

  filterNodes = (taskPackage: any): Selection => {
    const { toolkit } = this.props;
    return toolkit.filter((obj: any) => obj.objectType === 'Node' && obj.data.packageName === taskPackage.value);
  }

  findDifference = (arr1: any, arr2: any): Array<any> => {
    return arr1
      .filter((x: any) => !arr2.find((y: any) => y.value === x.value))
      .concat(arr2.filter((x: any) => !arr1.find((y: any) => y.value === x.value)));
  }

  handleSelectChange = (process: any, options: any): void => {
    const { surface } = this.props;

    const selectedPackages = options;
    const prevSelectedPackages = this.state.selectedPackages[process.name];


    this.setState({
      selectedPackages: {
        ...this.state.selectedPackages,
        [process.name]: selectedPackages
      }
    }, (): void => {
      const wasDeleted = prevSelectedPackages.length > selectedPackages.length;

      const changedPackages = this.findDifference(selectedPackages, prevSelectedPackages);
      const filteredTasks: Array<any> = [];

      changedPackages.forEach((taskPackage: any) => {
        filteredTasks.push(this.filterNodes(taskPackage));
      });

      filteredTasks.forEach((taskSelection: any) => {
        surface.setVisible(taskSelection, !wasDeleted);
      });
    });
  }

  renderProcessFilter = (process: any) => {
    const { selectedPackages } = this.state;

    return (
      <div className={'processes_menu__processes_wrapper'}>
        <p className={'processes_menu__process_name'}>{process.name}</p>
        <div className={'processes_menu__process_picker_wrapper'}>
          <Select
            value={selectedPackages[process.name]}
            isMulti
            options={process.packages}
            onChange={(options: any) => this.handleSelectChange(process, options)}
            showJustNumber
            setDisplayNumberLabel={(itemsCount: number) => `${itemsCount} ${itemsCount === 1 ? 'Package' : 'Packages'} selected`}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={'processes_menu__container'}>
        {HARDCODED_PROCESSES.map((process: any, i: number) => {
          return (<Fragment key={i}>
            {this.renderProcessFilter(process)}
          </Fragment>);
        })}
      </div>
    );
  }
}

export default ProcessesMenu;
