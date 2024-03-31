const BlogForm = ({newBlog, handleBlogTitle, handleBlogAuthor, handleBlogURL, handleAddBlog, createBlogVisible, handleCreateBlogVisible}) => { 
    const { title, author, url } = newBlog
   
    return(
            <form onSubmit={handleAddBlog}>
                <div>
                    <label htmlFor="title">Title &nbsp;</label>
                    <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={handleBlogTitle}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author &nbsp;</label>
                    <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={handleBlogAuthor}
                    />
                </div>
                <div>
                    <label htmlFor="url">URL &nbsp;</label>
                    <input
                    type="text"
                    value={url}
                    name="url"
                    onChange={handleBlogURL}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
    )
} 

export default BlogForm