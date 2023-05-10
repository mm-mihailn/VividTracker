import React, { Component } from 'react';
import './UseTrackerWrapperStyles/TableStyles.css';

class Table extends Component {
  
  
  render() {
    const {allRecordsRegardlessValuePresence, allItemsRegardlessValuePresence, records, itemsList } = this.props;
    const allPossibleValuesAmount = allRecordsRegardlessValuePresence.length * allItemsRegardlessValuePresence.length
    let defaultValuesList = Array(allPossibleValuesAmount)
    // Add the items from allItemsRegardlessValuePresence to the beginning of the array
    for (let i = 0; i < allItemsRegardlessValuePresence.length; i++) {
      let currentIndexValueNormalized = i * 2
      defaultValuesList[currentIndexValueNormalized] = allItemsRegardlessValuePresence[i];
      defaultValuesList[currentIndexValueNormalized + 1] = allItemsRegardlessValuePresence[i];
    }

    console.log(defaultValuesList)
    const visibleItems = 5
    return (
      <div className='useTrackerContainer'>
        <table className="table" >
          <thead>
            <tr className="border-bottom" style={{ borderBottom: '1px solid #ddd', margin: '20px 0' }}>
              <th className='TrackingItemContainer'>Projects</th>
              {itemsList.length > 0 
              ? 
                [...new Set(itemsList
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
                  :
                  [...new Set(allItemsRegardlessValuePresence
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
            {
              records.length > 0 && 
              itemsList.length > 0 
              ? 
                records.map(record => (
                  <tr key={record.id} className='TrackingItemValueContainer' >
                    <div className='RecordNameContainer'>{record.name}</div>
                    {itemsList.map((valuesObject, key) => {
                      let targetTrackingItemId = Number(Object.keys(valuesObject)[0])
                      let targetTrackingItemValuesArray = Object.values(valuesObject)[0]

                      let valueArray = targetTrackingItemValuesArray.filter((targetTrackingItemValue) => {
                        return targetTrackingItemValue.recordId == record.id
                      })
                      
                      let colorPercentageMaxValue = '0'
                      if(valueArray[0])
                      {
                        colorPercentageMaxValue = (valueArray[0].value / valueArray[0].maxValue).toString().split('.')[1]
                        if(colorPercentageMaxValue)
                        {
                          if(valueArray[0].value / valueArray[0].maxValue < 0.1)
                          {
                            colorPercentageMaxValue = '0' + colorPercentageMaxValue.substring(0,2)
                          }
                          else
                          {
                            colorPercentageMaxValue = colorPercentageMaxValue.substring(0,2)
                          }
                        }
                      }
                      let finalValue = valueArray.length > 0 ? valueArray[0].value : '';
                      let finalValueId = valueArray.length > 0 ? valueArray[0].id : null
                      if(key < visibleItems)
                      {
                        return <td>
                              <div className='ValueContainer' onClick={() => this.props.panelHandler(targetTrackingItemId, finalValueId, record.id)}>
                                {finalValue >= 1 
                                  ? 
                                    valueArray[0] 
                                    ?
                                      valueArray[0].isIrrelevantAllowed 
                                      ?
                                        <p className='square' style={{backgroundColor: `${valueArray[0].irrelevantColor}`}}/>
                                      :
                                      valueArray[0].value == valueArray[0].maxValue 
                                      ?
                                        <p className='square' 
                                        style={{backgroundColor: `${valueArray[0].maxValueColor}`}}/>
                                      :
                                        valueArray[0].value == valueArray[0].minValue
                                        ?
                                          <p className='square' 
                                          style={{backgroundColor: `${valueArray[0].minValueColor}`}}/>
                                        :
                                        <p className='square' 
                                        style={{backgroundColor: `${valueArray[0].maxValueColor + colorPercentageMaxValue}`}}/>
                                    :
                                      <p className='square'/>
                                  : 
                                  <p className='square' style={{backgroundColor: 'red'}}></p>

                                }
                                <p className='ValueContainerText'>{finalValue ? finalValue : '-'}</p>
                              </div>
                          </td>
                      }
                    })}
                  </tr>
                ))
              :
                allRecordsRegardlessValuePresence.map((record) => {
                  return(
                    <tr className='TrackingItemValueContainer' >
                      <div className='RecordNameContainer'>{record.name}</div>
                      {/* create an array of length of all possible values!  */}
                      {defaultValuesList.map((wannabeValuesObject, key) => {
                        let targetObjectKey = Object.keys(wannabeValuesObject)
                        let targetObject = wannabeValuesObject[targetObjectKey][0]
                        if(key < visibleItems)
                        {
                          return <td>
                                <div className='ValueContainer' onClick={() => this.props.panelHandler(targetObject.id, null, record.id)}>
                                  <p className='square' style={{backgroundColor: 'red'}}></p>
                                  <p className='ValueContainerText'>-</p>
                                </div>
                            </td>
                        }
                      })}
                    </tr>
                  )
                })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
