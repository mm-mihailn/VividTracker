import React from 'react';
import './UseTrackerWrapperStyles/TableStyles.css'

const Table = ({ records, itemsList }) => {

  return (
    <table>
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
              let valueArray = targetTrackingItemValuesArray.filter((targetTrackingItemValue) => {
                return targetTrackingItemValue.recordId == record.id
              })
              return <td className={valueArray.length > 0 ? 'ValueContainer' : 'EmptyValueContainer'}>{valueArray.length > 0 ? valueArray[0].value : ''}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
