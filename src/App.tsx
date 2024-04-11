import {useState } from 'react'

import './App.css'

// global checkbox selects/unselects all
// list of rows
// each row has a checkbox, checkbox
// if we select all of them then the global check box is impacted 

// list of items, each item has a text and checkbox => state
// comp with a checkbox => state

// data static 

interface ItemData {
  id: string;
  title: string;
  checked: boolean;
}

const data: ItemData[] = [{
  id: '1',
  title: 'title',
  checked: true},
  {
    id: '2',
    title: 'title 2',
    checked: false
  },
  {
    id: '3',
    title: 'title 3',
    checked: false
  }
];


interface ItemProps  {
  item: ItemData,
  onCheckedChange: (checked: ItemData['checked']) => void
}

const Item = (props: ItemProps) => {
  const { item, onCheckedChange } = props;
  const { id, title, checked} = item;

  return(
    <div>
       <input  name='item' key={id} checked={checked} type='checkbox' onChange={(event)=> {
          onCheckedChange(event.target.checked)
       }}/>
      <label>{title}</label>
    </div>
  )
}



interface GlobalCheckboxProps  {
  checked: boolean;
  onCheckedChange: (checked: ItemData['checked']) => void
}

const GlobalCheckbox = (props: GlobalCheckboxProps) => {
  const {checked, onCheckedChange} = props
  return (

    <Item item={{
      id:'global',
      title: 'Global', checked}
    } 
      onCheckedChange={onCheckedChange}
      />
  )
}

function App() {
  const [dataItems, setDataItems] = useState(data);
  const itemsChecked = dataItems.filter((item) => item.checked).length
  const allItemsChecked = itemsChecked === dataItems.length;
  const [globalChecked, setGlobalChecked] = useState<boolean>(allItemsChecked);

  return (
    <>
      <GlobalCheckbox checked={globalChecked} onCheckedChange={(checkedValue) => {
        const newData = dataItems.map((item) => {
          return {
            ...item,
          checked: checkedValue
          }
          
        })
        setGlobalChecked(checkedValue)
        setDataItems(newData)

      }}/>

      <div>
          {
            dataItems.map((item, index) => {
                return (
                  <Item item={item} onCheckedChange={(checkedValue) => {
                    const newData = dataItems.map((item, i) => {
                        return {
                          ...item,
                          ...(i === index && { checked: checkedValue})
                        }
                    })                        
                    setGlobalChecked(newData.filter((item) => item.checked).length === dataItems.length)
                    setDataItems(
                      newData
                    )
                  }} />
                )
            })
          }
        </div>
      
    </>
  )
}

export default App
