const BlogForm = ({newBlog, handleBlogTitle, handleBlogAuthor, handleBlogURL, handleAddBlog, createBlogVisible, handleCreateBlogVisible}) => { 
    const { title, author, url } = newBlog

    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }
    
    return(
      <div>
        <div style={hideWhenVisible}>
            <button onClick={handleCreateBlogVisible}>New blog</button>
        </div>
        <div style={showWhenVisible}>
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
                <button onClick={handleCreateBlogVisible}>Cancel</button>
            </form>
        </div>  
      </div>  
    )
} 

export default BlogForm