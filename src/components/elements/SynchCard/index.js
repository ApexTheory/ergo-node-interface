import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faCheck } from '@fortawesome/free-solid-svg-icons'
import InfoCard from '../../common/InfoCard'
import './index.scss'

export default class SynchCard extends Component {
  renderActiveSynchronization = () => (
    <>
      <p className="info-card__title">Current node state</p>
      <p className="info-card__label text-warning">
        <FontAwesomeIcon icon={faSync} spin></FontAwesomeIcon> Active
        synchronization
      </p>
    </>
  )

  renderCompleteSynchronization = () => (
    <>
      <p className="info-card__title">Current node state</p>
      <p className="info-card__label text-success">
        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Node is synced
      </p>
    </>
  )

  renderSynchronizationState = state =>
    ({
      active: this.renderActiveSynchronization,
      complete: this.renderCompleteSynchronization,
    }[state])

  getSynchronizationState = ({ fullHeight, headersHeight }) => {
    if (
      fullHeight !== null &&
      headersHeight !== null &&
      fullHeight === headersHeight
    ) {
      return 'complete'
    }

    return 'active'
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.getSynchronizationState(nextProps) !==
      this.getSynchronizationState(this.props.nodeInfo)
    ) {
      return true
    }

    return false
  }

  render() {
    const currentSynchState = this.getSynchronizationState(this.props.nodeInfo)
    return (
      <InfoCard className={this.props.className}>
        {this.renderSynchronizationState(currentSynchState)()}
      </InfoCard>
    )
  }
}
