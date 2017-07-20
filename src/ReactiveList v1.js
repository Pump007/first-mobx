import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, autorun } from 'mobx';

function ListItem(props) {
    return <li style={{ listStyle: "none" }}>{props.item.text}</li>;
}


let ListContainer = observer(function ListContainer(props) {
    return (
        <ul>
            {
                props.items.map((item, idx) => (
                    <ListItem key={`item-${idx}`} index={idx} item={item} />
                ))
            }
        </ul>
    );
});


class ReactiveList extends Component {

    constructor(props) {
        super(props);
        setTimeout(() => {
            let newItem = { origorder: 150, order: 150, text: 'Feature #150' };
            this.props.liststore.addItem(newItem);
        }, 10000);
    }

    render() {
        autorun(() => console.log(this.props.liststore.listitems.length));
        const items = this.props.liststore.listitems;
        return (
            <div style={{ width: "150px", textAlign: "left", border: "1px solid red" }}>
                <ListContainer items={items} />
            </div>
        )
    }
};

export default ReactiveList;