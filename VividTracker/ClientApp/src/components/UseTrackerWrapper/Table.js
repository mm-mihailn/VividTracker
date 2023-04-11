import React, { Component } from 'react';
import './UseTrackerWrapperStyles/TableStyles.css';

class Table extends Component {
  render() {
    const { records, itemsList } = this.props;
    return (
      <div className='useTrackerContainer'>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className='TrackingItemContainer'>Record</th>
              {[...new Set(itemsList
              .flatMap(item => Object.values(item))
                .flatMap(values => values.map(value => value.trackingItemName)))]
                  .map(name => (
                    <th key={name} className='TrackingItem'>{name}</th>
                  )
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
                  // TODO: IF NO ENTRIES FOR RECORD ADD EMPTY FIELDS AGAIN
                  let valueArray = targetTrackingItemValuesArray.filter((targetTrackingItemValue) => {
                    return targetTrackingItemValue.recordId == record.id
                  })
                  if(valueArray.length > 0 )
                  {
                    return <td className='ValueContainer'> 
                        <p className='square'></p> 
                        <p className='ValueParagraph'>{valueArray[0].value}</p> 
                      </td>
                  }
                  else
                  {
                    return <td className='EmptyValueContainer'>
                        <p className='square' style={{backgroundColor: 'red'}}></p> 
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
