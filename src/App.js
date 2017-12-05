import React, { Component } from 'react';

import './semantic/dist/semantic.min.css';

import { Container, Form, Header, Segment, Select, TextArea } from 'semantic-ui-react'
import * as OPS from './ops';
import _ from 'lodash'

class App extends Component {
  state = {
    op: false,
    ops: [[]]
  }
  onChangeOp = (e, { value }) => {
    const opType = value
    const op = _.find(OPS, { operation: opType})
    const opData = {}
    op.params.forEach((param) => {
      opData[param] = ''
    })
    this.setState({
      op,
      ops: [[opType, opData]],
      b64encoded: window.btoa(JSON.stringify([[opType, opData]]))
    })
  }
  onChangeParam = (e, { value, name }) => {
    const ops = this.state.ops
    const op = ops[0]
    const opType = op[0]
    const opData = op[1]
    opData[name] = value
    this.setState({
      ops: [[opType, opData]],
      b64encoded: window.btoa(JSON.stringify([[opType, opData]]))
    })
  }
  createOpField = (param, idx) => {
    return (
      <Form.Field key={`${param}-${idx}`}>
        <label>{param}</label>
        <Form.Input
          name={param}
          value={this.state[param]}
          onChange={this.onChangeParam}
        />
      </Form.Field>
    )
  }

  opFields = (op) => {
    if(!op) return false
    return op.params.map(this.createOpField)
  }

  render() {
    const { op, ops, b64encoded } = this.state
    const current = ops[0]
    const opType = current[0]
    const opData = current[1]
    const sc_url_params = (opData) ? Object.keys(opData).reduce(function(a,k){a.push(k+'='+encodeURIComponent(opData[k]));return a},[]).join('&') : ''
    const ops_options = Object.keys(OPS).map((idx) => {
      return {
        key: OPS[idx].operation,
        text: OPS[idx].operation,
        value: OPS[idx].operation
      }
    })
    return (
      <Container className="App" style={{paddingTop: '1em'}}>
        <Header>
          opbuilder
        </Header>
        <Segment>
          <Form>
            <Form.Select
              name='op'
              label='Operation Type'
              options={ops_options}
              onChange={this.onChangeOp}
            />
            {(op)
              ? (
                <Segment basic size='small'>
                  <Header>
                    Operation Parameters
                  </Header>
                  {this.opFields(op)}
                </Segment>
              )
              : false
            }
          </Form>
          {(op)
            ? (
              <Segment padded secondary>
                <Header>
                  Operations (JSON)
                </Header>
                <Form>
                  <TextArea rows={10} value={JSON.stringify(ops, null, 2) } />
                </Form>
                <Header>
                  Operations (Base64 Encoded JSON string)
                </Header>
                <Form>
                  <TextArea rows={4} value={b64encoded}/>
                </Form>
                <Header>
                  Steem HTTP Protocol
                </Header>
                <Segment attached style={{overflowX: 'scroll', overflowX: 'hidden'}}>
                  <a href={`steem://sign/tx/${b64encoded}`}>
                    {`steem://sign/tx/${b64encoded}`}
                  </a>
                </Segment>
                <Header>
                  SteemConnect Transaction Signer
                </Header>
                <Segment attached style={{overflowX: 'scroll', overflowX: 'hidden'}}>
                  <p>
                    <a href={`https://v2.steemconnect.com/sign/tx/${b64encoded}`}>
                      {`https://v2.steemconnect.com/sign/tx/${b64encoded}`}
                    </a>
                  </p>
                  <p>
                    <a href={`https://v2.steemconnect.com/sign/${opType}/`}>
                      {`https://v2.steemconnect.com/sign/${opType}?${sc_url_params}`}
                    </a>
                  </p>
                </Segment>
              </Segment>
            )
            : false
          }
        </Segment>
      </Container>
    );
  }
}

export default App;
