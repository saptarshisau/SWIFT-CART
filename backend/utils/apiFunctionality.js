class APIFunctionality {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword
            ? {
                //$or: for multiple types of searches such as search by category,etc , but here we only search by name
                name: {
                    $regex: this.queryString.keyword, //Find any product whose name contains "iphone".So it finds iPhone 15 ,iphone charger
                    $options: "i", // case-insensitive
                },
            }
            : {};

        this.query = this.query.find({ ...keyword }); //Product.find().find({keyword}), MONOGODB merges those find methods

        return this;
    }
    filter() {
        const queryCopy = { ...this.queryString };
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((field) => delete queryCopy[field]);
        this.query = this.query.find(queryCopy);
        // console.log(queryCopy)
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default APIFunctionality;