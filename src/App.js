import React, { Component } from 'react';

import './semantic/dist/semantic.min.css';

import { Container, Checkbox, Dropdown, Form, Header, Segment, Select, TextArea } from 'semantic-ui-react'
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
      if(op.rules[param]) {
        switch(op.rules[param]) {
          case "percent":
            opData[param] = 10000
            break;
          case "bool":
            opData[param] = false
            break;
          default:
            opData[param] = ''
            break;
        }
      } else {
        opData[param] = ''
      }
    })
    this.setState({
      op,
      ops: [[opType, opData]],
      b64encoded: window.btoa(JSON.stringify([[opType, opData]]))
    })
  }
  onChangeParamToggle = (
    e: SyntheticEvent, { name, checked }: { name: string, checked: string }
    ) => {
      const ops = this.state.ops
      const op = ops[0]
      const opType = op[0]
      const opData = op[1]
      opData[name] = checked
      this.setState({
        ops: [[opType, opData]],
        b64encoded: window.btoa(JSON.stringify([[opType, opData]]))
      })
  }

  onChangeParam = (e, { value, name }) => {
    const ops = this.state.ops
    const op = ops[0]
    const opType = op[0]
    const opData = op[1]
    const { rules } = this.state.op
    if(rules[name]) {
      switch(rules[name]) {
        case "percent":
          const parsed = parseInt(value)
          if(parsed >= 0) {
            opData[name] = parseInt(value)
          } else {
            opData[name] = value
          }
          break;
        default:
          opData[name] = value
          break;
      }
    } else {
      opData[name] = value
    }
    this.setState({
      ops: [[opType, opData]],
      b64encoded: window.btoa(JSON.stringify([[opType, opData]]))
    })
  }
  createOpField = (param, idx) => {
    const ops = this.state.ops
    const op = ops[0]
    const opData = op[1]
    const { rules } = this.state.op
    let field = <Form.Input
      name={param}
      value={opData[param]}
      onChange={this.onChangeParam}
    />
    if(rules[param]) {
      switch(rules[param]) {
        case "json":
          field = (
            <TextArea
              name={param}
              value={this.state[param]}
              onChange={this.onChangeParam}
            />
          )
          break;
        case "bool":
          field = (
            <Checkbox
              name={param}
              value={this.state[param]}
              checked={this.state[param]}
              onChange={this.onChangeParamToggle}
            />
          )
          break;
      }
    }
    return (
      <Form.Field key={`${param}-${idx}`}>
        <label>{param}</label>
        {field}
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
            <Form.Field>
              <label>Operation Type</label>
              <Dropdown
                name='op'
                options={ops_options}
                onChange={this.onChangeOp}
                fluid
                search
                selection
              />
            </Form.Field>
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
                    <a href={`https://v2.steemconnect.com/sign/${opType}?${sc_url_params}`}>
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
