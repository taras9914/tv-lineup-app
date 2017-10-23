import React from 'react'
import { connect } from 'react-redux'
import { addEpisode, removeEpisode, fetchMyLineup } from '../../actions/shows'
import { formatSummary } from '../../services/formatting'
import { Card, Button, Image } from 'semantic-ui-react'
import moment from 'moment'

class EpisodeItem extends React.Component {

  addEpisode = (e) => {
    e.preventDefault()
    const episode = JSON.stringify({episode: this.props.episode,
      show_id: this.props.showId})
    this.props.addEpisode(episode)
    }

  removeEpisode = (e) => {
    e.preventDefault()
    const id = JSON.stringify({id: this.props.episode.id})
    this.props.removeEpisode(id)
    }

  render(){
    const ep = this.props.episode
    let summary = ""
    if (ep) { ep.summary ? summary = formatSummary(ep.summary) : null }

    return(
      <Card>
        <Card.Content>
          { ep.image ? <Image src={ep.image.original} alt={ep.name}/> : null }
          <p></p>
          <Card.Header as='h3'>{ep.name}</Card.Header>
          <Card.Description>Season {ep.season}: Episode {ep.number}</Card.Description>
          <Card.Description>Airs {moment(ep.airstamp).format('ddd, M-D-YYYY')} at {moment(ep.airstamp).format('h:mm a')}</Card.Description>
          <p></p>
          <Card.Description>{summary}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
          <Button basic color='teal' as='a' href={ep.url} target='_blank' content='More Info' icon='external'/>
          { this.props.added.length ? <Button basic color='yellow' onClick={this.removeEpisode} content='Remove' icon='remove from calendar'/> : <Button basic color='olive' onClick={this.addEpisode} content='My Lineup' icon='add to calendar' /> }
          </div>
        </Card.Content>
      </Card>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addEpisode: (episode) => {
      dispatch(addEpisode(episode))
    },
    fetchMyLineup: (id) => {
      dispatch(fetchMyLineup(id))
    },
    removeEpisode: (id) => {
      dispatch(removeEpisode(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myLineup: state.show.myLineup,
    isFetching: state.show.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeItem)

