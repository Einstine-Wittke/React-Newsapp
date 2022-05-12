import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  
  static defaultProps = {
    country:'in',
    pageSize:6,
    category:"general"
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  constructor(props) {
    super(props)
    console.log("hello I am a constructor from news Component");
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
    document.title = `${this.props.category} - NewsPunk`
  }
 async updateNews(){
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c9ee0452bb14380b8bd2ac599bc79da&page=${this.state.page}&pageSize=${this.props.pageSize}`
  this.setState({ loading: true })
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({
    articles: parsedData.articles, totalArticles: parsedData.totalResults,
    loading: false
  })
 }
  async componentDidMount() {
   this.updateNews();
  }

  handlePrevClick = async () => {
   
    this.setState({page: this.state.page - 1})
    this.updateNews()
  }

  handleNextClick = async () => {
   
    this.setState({page: this.state.page + 1})
    this.updateNews()

  }

  render() {
    console.log("render");
    return (
      <div className='container my-3'>
        <h1 className='newspunk text-center'>NewsPunk - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description}
                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" onClick={this.handlePrevClick}> &larr; Previous</button> &nbsp;
          <button disabled={this.state.page >= 12} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>  Next &rarr; </button>
        </div>
      </div>
    )
  }
}

export default News