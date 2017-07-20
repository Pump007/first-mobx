import { observable, action } from 'mobx';



class ListStore {
    @observable listitems = [];

    constructor(props) {
        let startArray = Array.apply(null, new Array(20))
            .map((item, idx) => { return { origorder: idx, order: idx, text: `Feature #${idx}` }; });
        this.listitems = startArray;
        setTimeout(() => {
            let newItem = { origorder: 100, order: 100, text: 'Feature #100' };
            this.addItem(newItem);
            console.log("item 100 added.");
        }, 5000);
    }

    @action addItem(item) {
        this.listitems.push(item);
    }

    @action updateListItems(newItems) {
        newItems.forEach((item, idx) => this.listitems[idx] = item);
    }

}

export default ListStore;