import React, { Component } from 'react';
import './UseTrackerWrapperStyles/TableStyles.css';

class Table extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      initialItemsList: Array(
        props.allItemsRegardlessValuePresence.length * props.allRecordsRegardlessValuePresence.length
      )
      .fill({'none':'none'}),
      itemsListCopy: props.itemsList
    }
  }

  render() {
    const {allRecordsRegardlessValuePresence, allItemsRegardlessValuePresence, records, itemsList, panelHandler } = this.props;
    const visibleItems = 5
    //TODO: Check why records aren't added to values object!
    return (
      <div className='useTrackerContainer'>
        <table className="table" >
          <thead>
            <tr className="border-bottom" style={{ borderBottom: '1px solid #ddd', margin: '20px 0' }}>
              <th className='TrackingItemContainer'>Projects</th>
              {itemsList.length > 0 
              ? 
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
                allRecordsRegardlessValuePresence.map(record => (
                  <tr key={record.id} className='TrackingItemValueContainer' >
                    <div className='RecordNameContainer'>{record.name}</div>
                    {
                    
                      // get all of the items (allItemsRegardlessOfValuePresence) and show the values only for those whose ids are in the itemsList
                      itemsList.concat(
                        allItemsRegardlessValuePresence.filter(item => !itemsList.some(obj => Object.keys(obj)[0] === Object.keys(item)[0]))
                      )
                      .map((valuesObject, key) => {
                            
                                if(valuesObject)
                                {
                                  // check if value exists, if it does show it, otherwise EMPTY CELL
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
                                  }       
                                  else
                                  {
                                    if(key < visibleItems )
                                    {
                                      return <td>
                                              <div className='ValueContainer' onClick={() => this.props.panelHandler(targetTrackingItemId, null, record.id)}>
                                                <p className='square' style={{backgroundColor: 'red'}}/>
                                                <p className='ValueContainerText'> - </p>
                                              </div> 
                                            </td>
                                    }
                                  }
                                }
                                
                      })
                    }
                    </tr>
                  ))
            }
                      
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;