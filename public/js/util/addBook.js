export const AddBook = (data) => {
    console.log(data);

    const { title, author, category, status } = data;

    if (!title || !author || !category || !status) {
        alert('All fields are required');
        return;
    }

    htmx.ajax('POST', '/add-book', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            author: author,
            category: category,
            status: status
        }),
        success: function (response) {
            console.log(response);
            alert('Book Added Successfully');
        },
        error: function (response) {
            console.log(response);
            alert('Book Add Failed');
        }
    });
}
