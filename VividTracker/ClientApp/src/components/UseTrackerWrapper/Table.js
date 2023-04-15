import React, { Component } from 'react';
import './UseTrackerWrapperStyles/TableStyles.css';

class Table extends Component {
  render() {
    const { records, itemsList } = this.props;
    const visibleItems = 5
    return (
      <div className='useTrackerContainer'>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className='TrackingItemContainer'>Record</th>
              {[...new Set(itemsList
              .flatMap(item => Object.values(item))
                .flatMap(values => values.map(value => value.trackingItemName)))]
                  .map((name, index) => {
                    if(index < visibleItems)
                    {
                      return <th key={name} className='TrackingItem'>{name}</th>
                    }
                    else
                    {
                      return <th key={name} className='TrackingItem hidden'>{name}</th>
                    }
                  }
                )
              }
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id} className='TrackingItemValueContainer'>
                <td>{record.name}</td>
                {itemsList.map((valuesObject, key) => {
                  let targetTrackingItemId = Number(Object.keys(valuesObject)[0])
                  let targetTrackingItemValuesArray = Object.values(valuesObject)[0]

                  let valueArray = targetTrackingItemValuesArray.filter((targetTrackingItemValue) => {
                    return targetTrackingItemValue.recordId == record.id
                  })
                  let finalValue = valueArray.length > 0 ? valueArray[0].value : '';
                  if(key < visibleItems)
                  {
                    return <td >
                          <div className='ValueContainer'>
                            {finalValue > 0 
                              ? 
                              <p className='square'></p>

                              : 
                              <p className='square' style={{backgroundColor: 'red'}}></p>

                            }
                            <p className='ValueContainerText'>{finalValue ? finalValue : '-'}</p>
                          </div>
                      </td>
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
