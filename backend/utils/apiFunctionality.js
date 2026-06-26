class APIFunctionality {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword
            ? {
                name: {
                    $regex: this.queryString.keyword,
                    $options: "i", // case-insensitive
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });

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