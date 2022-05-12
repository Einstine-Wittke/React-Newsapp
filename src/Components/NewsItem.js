import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h6 className="card-title"> {title} <p className="badge bg-danger">{source}</p></h6>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn btn-dark">Explore More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem