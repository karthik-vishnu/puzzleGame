import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import styles from './DragAndDrop.css';
import { tmpdir } from 'os';

const SortableItem = SortableElement(({ value }) => <div className='cell'>{value}</div>)

const SortableList = SortableContainer(({ items }) => {
    return (
        <div className='container'>
            {items.map((value, index) => (
                <SortableItem key={index} index={index} value={value} />
            ))}
        </div>
    )
})

class DragAndDropComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            items: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
        })
    }

    onSortEnd(index, context) {
        const newItems =  [].concat(context.state.items); //arrayMove(context.state.items, index.oldIndex, index.newIndex);
        let temp = newItems[index.oldIndex];
        newItems[index.oldIndex] = newItems[index.newIndex];
        newItems[index.newIndex] = temp;
        this.setState({
            items: newItems
        })
    };
    dragstart(event, taskName) {
        console.log('dragstart on div: ', event);
        event.dataTransfer.setData("taskName", event.target.id);
        var top = ReactDOM.findDOMNode(this).offsetTop;
        var left = ReactDOM.findDOMNode(this).offsetLeft;
        console.log('top', top);
        console.log('left', left);
        var X = event.pageX - left;
        var Y = event.pageY - top;
        //document.getElementById('test').style.top = Y + 'px'
        //document.getElementById('test').style.left = X + 'px'
    };
    drop(event) {
        event.preventDefault();

        var dropTarget = event.target;
        var dragTargetId = event.dataTransfer.getData('taskName');
        var dragTarget = document.getElementById(dragTargetId);
        var temp = document.createElement('span');
        temp.className += '.hide';
        dropTarget.before(temp);
        dragTarget.before(dropTarget);
        temp.replaceWith(dragTarget);
    }

    render() {
        return (
            <div>
                <SortableList axis={'xy'} SortEnd={(index) => this.onSortEnd(index, this)} items={this.state.items} />
                <div 
                    
                    onDrop ={(event) => this.drop(event, this)}
                    onDragOver={(event) => event.preventDefault()}
                    style={{'height': '30px', width: '70px', border: '1px solid #000', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                    >
                    <p id='test' draggable onDragStart= {(event) => this.dragstart(event, 'start')}>Hell boy</p>
                </div>
                <div style={{'height': '30px', width: '70px', border: '1px solid #000', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                    onDrop ={(event) => this.drop(event, this)}
                    onDragOver={(event) => event.preventDefault()}>
                    <p id='test1' draggable onDragStart= {(event) => this.dragstart(event, 'start')}>Hello </p>
                </div>
            </div>
        )
    }
}


export default DragAndDropComponent;
