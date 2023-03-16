const PaginationService = {
  handlePagination: (obj, current_page) => {
    const isAlreadyExist = obj?.data?.length > 0;
    //console.log('isAlreadyExist:',isAlreadyExist);

    if (isAlreadyExist) {
      if (current_page < obj?.pagination.total_pages) {
        return ++current_page;
      }
      return 0;
    } else {
      return 1;
    }
  },
};

export default PaginationService;
