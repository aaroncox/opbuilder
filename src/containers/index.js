import React, { Component } from 'react';

import { Container, Checkbox, Divider, Dropdown, Form, Header, Segment, Select, TextArea } from 'semantic-ui-react'
import * as OPS from '../ops';
import _ from 'lodash'

class IndexContainer extends Component {
  constructor(props) {
    super(props)
    let initialState = {
      op: false,
      ops: [[]],
      meta: {}
    }
    if(props.match.params.ops) {
      initialState['b64encoded_ops'] = props.match.params.ops
    }
    if(props.location.hash) {
      initialState['b64encoded_meta'] = props.location.hash.replace(/^#/, "");
    }
    this.state = initialState
  }
  componentWillUpdate(nextProps, nextState) {
    const url = `/opbuilder/sign/tx/${nextState.b64encoded}`
    const hash = `#${nextState.b64encodedmeta}`
    // console.log("check")
    // console.log(url, this.props.location.pathname)
    // console.log(hash, this.props.location.hash)
    if(url !== this.props.location.pathname || hash !== this.props.location.hash) {
      this.props.history.replace(url + hash)
    }
  }
  componentWillMount() {
    const { b64encoded_meta, b64encoded_ops } = this.state
    if(b64encoded_ops) {
      const { b64encoded_ops } = this.state
      try {
        const ops = JSON.parse(window.atob(b64encoded_ops))
        const op = ops[0]
        const opType = op[0]
        const opData = op[1]
        this.setState({
          b64encoded: b64encoded_ops,
          op: _.find(OPS, { operation: opType}),
          ops,
        })
      } catch(exception) {
        console.log(exception)
      }
    }
    if(b64encoded_meta) {
      try {
        const meta = JSON.parse(window.atob(b64encoded_meta))
        this.setState({
          meta,
          b64encodedmeta: b64encoded_meta
        })
      } catch(exception) {
        console.log(exception)
      }
    }
  }
  changeMetaPrompt = (e, { name, checked }) => {
    const { meta } = this.state
    let newMeta = Object.assign({}, meta)
    if(!newMeta[name]) newMeta[name] = {}
    newMeta[name]['prompt'] = !!checked
    this.setState({
      meta: newMeta,
      b64encodedmeta: (Object.keys(newMeta).length > 0) ? window.btoa(JSON.stringify(newMeta)) : false,
    })
  }
  changeMetaType = (e, { name, value }) => {
    const { meta } = this.state
    let newMeta = Object.assign({}, meta)
    if(!newMeta[name]) newMeta[name] = {}
    newMeta[name]['type'] = value
    this.setState({
      meta: newMeta,
      b64encodedmeta: (Object.keys(newMeta).length > 0) ? window.btoa(JSON.stringify(newMeta)) : false,
    })
  }
  changeMetaLabel = (e, { name, value }) => {
    const { meta } = this.state
    let newMeta = Object.assign({}, meta)
    if(!newMeta[name]) newMeta[name] = {}
    newMeta[name]['label'] = value
    this.setState({
      meta: newMeta,
      b64encodedmeta: (Object.keys(newMeta).length > 0) ? window.btoa(JSON.stringify(newMeta)) : false,
    })
  }
  onChangeOp = (e, { value }) => {
    const opType = value
    const op = _.find(OPS, { operation: opType})
    const opData = {}
    op.params.forEach((param) => {
      if(op.rules[param] && !opData[param]) {
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
      meta: {},
      b64encoded: window.btoa(JSON.stringify([[opType, opData]])),
      b64encodedmeta: window.btoa(JSON.stringify(this.state.meta))
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
        b64encoded: window.btoa(JSON.stringify([[opType, opData]])),
        b64encodedmeta: window.btoa(JSON.stringify(this.state.meta))
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
      b64encoded: window.btoa(JSON.stringify([[opType, opData]])),
      b64encodedmeta: window.btoa(JSON.stringify(this.state.meta))
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
              value={opData[param]}
              onChange={this.onChangeParam}
            />
          )
          break;
        case "bool":
          field = (
            <Checkbox
              name={param}
              value={opData[param]}
              checked={opData[param]}
              onChange={this.onChangeParamToggle}
            />
          )
          break;
      }
    }
    const options = [
      { key: 'text', text: 'Text', value: 'text' },
      { key: 'asset', text: 'STEEM/SBD', value: 'asset' },
      { key: 'vests', text: 'SP/Vests', value: 'vests'},
    ]
    const meta = this.state.meta[param]
    return (
      <Segment attached={(idx == this.state.op.params.length - 1) ? 'bottom' : true} key={`${param}-${idx}`}>
        <Form.Field>
          <label>{param}</label>
          {field}
        </Form.Field>
        <Form.Group inline>
          <Form.Field>
            <label>Operation Meta:</label>
          </Form.Field>
          <Form.Field>
            <Checkbox
              label='prompt user for value'
              name={param}
              checked={(meta) ? meta.prompt : false}
              onChange={this.changeMetaPrompt}
            />
          </Form.Field>
          <Form.Select
            label='Input Type'
            name={param}
            onChange={this.changeMetaType}
            value={(meta) ? meta.type : ''}
            options={options}
          />
          <Form.Field>
            <Form.Input
              label='Custom Label'
              name={param}
              value={(meta) ? meta.label : ''}
              onChange={this.changeMetaLabel}
            />
          </Form.Field>
        </Form.Group>
      </Segment>
    )
  }

  opFields = (op) => {
    if(!op) return false
    return op.params.map(this.createOpField)
  }

  render() {
    const { op, ops, meta, b64encoded, b64encodedmeta } = this.state
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
            <Header inverted attached='top'>
              Select a type of Steem Operation
            </Header>
            <Segment attached='bottom'>
              <Form.Field>
                <Dropdown
                  name='op'
                  value={opType}
                  options={ops_options}
                  onChange={this.onChangeOp}
                  fluid
                  search
                  selection
                />
              </Form.Field>
            </Segment>
            {(op)
              ? (
                <div>
                  <Header inverted attached='top'>
                    Operation Parameters
                  </Header>
                  {this.opFields(op)}
                </div>
              )
              : false
            }
          </Form>
          {(op)
            ? (
              <div>
                <Header inverted attached='top'>
                  Operation Data
                </Header>
                <Segment padded secondary attached='bottom'>
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
                    Operations Meta (JSON)
                  </Header>
                  <Form>
                    <TextArea rows={10} value={JSON.stringify(meta, null, 2) } />
                  </Form>
                  <Header>
                    Operations Meta (Base64 Encoded JSON string)
                  </Header>
                  <Form>
                    <TextArea rows={4} value={b64encodedmeta}/>
                  </Form>
                  <Header>
                    Steem HTTP Protocol
                  </Header>
                  <Segment attached style={{overflowX: 'scroll', overflowX: 'hidden'}}>
                    <a href={`steem://sign/tx/${b64encoded}#${b64encodedmeta}`}>
                      {`steem://sign/tx/${b64encoded}#${b64encodedmeta}`}
                    </a>
                  </Segment>
                  <Header>
                    SteemConnect Transaction Signer
                  </Header>
                  <Segment attached style={{overflowX: 'scroll', overflowX: 'hidden'}}>
                    <p>
                      <a href={`https://v2.steemconnect.com/sign/tx/${b64encoded}#${b64encodedmeta}`}>
                        {`https://v2.steemconnect.com/sign/tx/${b64encoded}#${b64encodedmeta}`}
                      </a>
                    </p>
                    <p>
                      <a href={`https://v2.steemconnect.com/sign/${opType}?${sc_url_params}`}>
                        {`https://v2.steemconnect.com/sign/${opType}?${sc_url_params}`}
                      </a>
                    </p>
                  </Segment>
                </Segment>
              </div>
            )
            : false
          }
        </Segment>
      </Container>
    );
  }
}

export default IndexContainer;
