const SearchService= {
   handleSearch : (searchTxt,setSearchText,list,key,setFilteredList) => {
  
    setSearchText(searchTxt);
    const text = searchTxt.toLowerCase();
    let results = [];
    if (text.length > 0) {
        results = list.filter((item) =>
          item[key]?.toLowerCase()?.includes(text)
        )
        setFilteredList(results);
    }
  }
}



export default SearchService;