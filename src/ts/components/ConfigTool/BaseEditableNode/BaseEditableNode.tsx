import { BaseNodeComponent }  from 'jsplumbtoolkit-react';
import { Dialogs, Node } from 'jsplumbtoolkit';

/**
 * The superclass for node types that wish to support label edit and removal - Action, Output and Question nodes.
 */
class BaseEditableComponent extends BaseNodeComponent {
  constructor(props: any) {
    super(props);
  }

  remove = (): void => {
    const node: Node = this.getNode();
    if (node) {
      this.toolkit.removeNode(node);
    }
  };

  edit = (): void => {
    const node: Node = this.getNode();
    if (node) {
      Dialogs.show({
        id: 'dlgText',
        data: node.data,
        title: 'Edit ' + node.data.type + ' name',
        onOK: (data: any) => {
          if (data.text && data.text.length > 2) {
            this.toolkit.updateNode(node, data);
          }
        }
      });
    }
  }
}

export default BaseEditableComponent
