import React, { Component } from 'react';
import DemoRating from './DemoRating'
import faker from 'faker'
import _ from 'lodash'
import { Accordion, Header } from 'semantic-ui-react'

const panels = _.times(3, i => ({
  key: `panel-${i}`,
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
}))

const DemoResults = () => (
  <div class = 'results-wrapper'>
    <div class='rating-wrapper'>
      <Header as='h4'>Similarity Ranking</Header>
      <DemoRating />
    </div>
    <Accordion defaultActiveIndex={[0, 2]} panels={panels} exclusive={false} fluid />
  </div>
)

export default DemoResults;
