import React, { Component } from 'react';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';
import DragAndDropComponent from './DragAndDropComponent';

class Module extends Component {

    render() {
        var elements = ['one', 'two', 'three', 'four'];
        return (
            <div>
                Haii this is the independent module
                <DragAndDropComponent />
            </div>
        )
    }
}

export default Module;