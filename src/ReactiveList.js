import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, autorun } from 'mobx';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';





const DragHandle = SortableHandle(() => <span>:::</span>);


const SortableListItem = SortableElement(function ListItem(props) {
    return <li style={{ listStyle: "none" }}><DragHandle />{props.item.text}</li>;
});


let SortableListContainer = SortableContainer(observer(function ListContainer(props) {
    return (
        <ul>
            {
                props.items.map((item, idx) => (
                    <SortableListItem key={`item-${idx}`} index={idx} item={item} />
                ))
            }
        </ul>
    );
}));

class AddNewFeature extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleAdd(event) {
        let newItem = { origorder: 200, order: 200, text: this.state.value };
        this.props.liststore.addItem(newItem);
        this.setState({ value: "" });
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange} style={{ width: '200px' }} />
                <button onClick={this.handleAdd}>Add+</button>
            </div>
        )
    }
}

class ReactiveList extends Component {

    constructor(props) {
        super(props);
        setTimeout(() => {
            let newIdx = this.props.liststore.listitems.length;
            let newItem = { origorder: newIdx, order: newIdx, text: `Feature #${newIdx}` };
            this.props.liststore.addItem(newItem);
        }, 10000);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    onSortEnd = function ({ oldIndex, newIndex }) {
        const items = this.props.liststore.listitems;
        let nextItems = arrayMove(items, oldIndex, newIndex);
        nextItems.forEach((item, idx) => item.order = idx);
        this.props.liststore.updateListItems(nextItems);
    }


    render() {
        const items = this.props.liststore.listitems;
        return (
            <div>
                <div style={{ width: "200px", height: "400px", textAlign: "left", border: "1px solid red", overflow: "auto" }}>
                    <SortableListContainer
                        items={items}
                        onSortEnd={this.onSortEnd}
                        useDragHandle={true}
                        lockToContainerEdges={true}
                    lockAxis="y" />
                </div>
                <div style={{ width: "200px", textAlign: "left", border: "1px solid red" }}>
                    <AddNewFeature liststore={this.props.liststore} />
                </div>
            </div>
        )
    }
};

export default ReactiveList;