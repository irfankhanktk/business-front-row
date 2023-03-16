const SelectionService= {
     onHandleChange:(item,index,items,setList,setBool)=>{
   
       
        item.selected=!item.selected;
        let copy=[...items];
        copy[index]=item;
        setList(copy);
       setBool(copy.some(ele=>ele?.selected));
      }
}



export default SelectionService;