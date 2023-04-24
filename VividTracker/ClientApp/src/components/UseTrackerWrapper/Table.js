import React, { Component } from 'react';
import './UseTrackerWrapperStyles/TableStyles.css';

class Table extends Component {
  render() {
    const { records, itemsList } = this.props;
    const visibleItems = 5
    return (
      <div className='useTrackerContainer'>
        <table className="table" >
          <thead>
            <tr className="border-bottom" style={{ borderBottom: '1px solid #ddd', margin: '20px 0' }}>
              <th className='TrackingItemContainer'>Projects</th>
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
              <tr key={record.id} className='TrackingItemValueContainer' >
                <div className='RecordNameContainer'>{record.name}</div>
                {itemsList.map((valuesObject, key) => {
                  let targetTrackingItemId = Number(Object.keys(valuesObject)[0])
                  let targetTrackingItemValuesArray = Object.values(valuesObject)[0]

                  let valueArray = targetTrackingItemValuesArray.filter((targetTrackingItemValue) => {
                    return targetTrackingItemValue.recordId == record.id
                  })
                  let finalValue = valueArray.length > 0 ? valueArray[0].value : '';
                  let finalValueId = valueArray.length > 0 ? valueArray[0].id : null
                  if(key < visibleItems)
                  {
                    return <td>
                          <div className='ValueContainer' onClick={finalValueId != null ? () => this.props.panelHandler(targetTrackingItemId, finalValueId) : null}>
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
