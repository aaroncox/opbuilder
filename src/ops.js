module.exports = [
  {
    "roles": ["posting", "active", "owner"],
    "operation": "vote",
    "rules": {
      author: "account",
      permlink: "permlink",
      voter: "account",
      weight: "percent"
    },
    "params": [
      "author",
      "permlink",
      "voter",
      "weight"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "comment",
    "rules": {
      author: "account",
      json_metadata: "json",
      parent_author: "account",
      parent_permlink: "permlink",
      permlink: "permlink",
    },
    "params": [
      "author",
      "body",
      "json_metadata",
      "parent_author",
      "parent_permlink",
      "permlink",
      "title",
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "transfer",
    "rules": {
      amount: "asset",
      from: "account",
      to: "account",
    },
    "params": [
      "amount",
      "from",
      "memo",
      "to",
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "transfer_to_vesting",
    "rules": {
      from: "account",
      to: "account",
      amount: "asset",
    },
    "params": [
      "from",
      "to",
      "amount"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "withdraw_vesting",
    "rules": {
      account: "account",
      vesting_shares: "asset"
    },
    "params": [
      "account",
      "vesting_shares"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "limit_order_create",
    "rules": {},
    "params": [
      "owner",
      "orderid",
      "amount_to_sell",
      "min_to_receive",
      "fill_or_kill",
      "expiration"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "limit_order_cancel",
    "rules": {
      owner: "account"
    },
    "params": [
      "owner",
      "orderid"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "price",
    "rules": {},
    "params": [
      "base",
      "quote"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "feed_publish",
    "rules": {
      publisher: "account"
    },
    "params": [
      "publisher",
      "exchange_rate"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "convert",
    "rules": {
      owner: "account",
      amount: "asset",
      requestid: "timestamp"
    },
    "params": [
      "owner",
      "requestid",
      "amount"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_create",
    "rules": {
      fee: "asset",
      creator: "account",
      new_account_name: "account",
      owner: "public_key",
      active: "public_key",
      posting: "public_key",
      memo_key: "public_key",
      json_metadata: "json"
    },
    "params": [
      "fee",
      "creator",
      "new_account_name",
      "owner",
      "active",
      "posting",
      "memo_key",
      "json_metadata"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_update",
    "rules": {
      account: "account",
      owner: "public_key",
      active: "public_key",
      posting: "public_key",
      memo_key: "public_key",
      json_metadata: "json"
    },
    "params": [
      "account",
      "owner",
      "active",
      "posting",
      "memo_key",
      "json_metadata"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "witness_update",
    "rules": {
      owner: "account",
      block_signing_key: "public_key",
    },
    "params": [
      "owner",
      "url",
      "block_signing_key",
      "props",
      "fee"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_witness_vote",
    "rules": {
      account: "account",
      approve: "bool",
      witness: "account"
    },
    "params": [
      "account",
      "approve",
      "witness",
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_witness_proxy",
    "rules": {
      account: "account",
      proxy: "account",
    },
    "params": [
      "account",
      "proxy"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "custom",
    "rules": {
      required_auths: "auths",
    },
    "params": [
      "required_auths",
      "id",
      "data"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "delete_comment",
    "rules": {
      author: "account",
      permlink: "permlink",
    },
    "params": [
      "author",
      "permlink"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "custom_json",
    "rules": {
      required_auths: "auths",
      required_posting_auths: "auths",
      json: "json"
    },
    "params": [
      "required_auths",
      "required_posting_auths",
      "id",
      "json"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "comment_options",
    "rules": {
      author: "account",
      permlink: "permlink",
      max_accepted_payout: "asset",
      percent_steem_dollars: "percent",
      allow_votes: "bool",
      allow_curation_rewards: "bool",
    },
    "params": [
      "author",
      "permlink",
      "max_accepted_payout",
      "percent_steem_dollars",
      "allow_votes",
      "allow_curation_rewards",
      "extensions"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "set_withdraw_vesting_route",
    "rules": {
      from_account: "account",
      to_account: "account",
      percent: "percent",
      auto_vest: "bool"
    },
    "params": [
      "from_account",
      "to_account",
      "percent",
      "auto_vest"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "limit_order_create2",
    "rules": {},
    "params": [
      "owner",
      "orderid",
      "amount_to_sell",
      "exchange_rate",
      "fill_or_kill",
      "expiration"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "challenge_authority",
    "rules": {},
    "params": [
      "challenger",
      "challenged",
      "require_owner"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "prove_authority",
    "rules": {},
    "params": [
      "challenged",
      "require_owner"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "request_account_recovery",
    "rules": {},
    "params": [
      "recovery_account",
      "account_to_recover",
      "new_owner_authority",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "recover_account",
    "rules": {},
    "params": [
      "account_to_recover",
      "new_owner_authority",
      "recent_owner_authority",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "change_recovery_account",
    "rules": {},
    "params": [
      "account_to_recover",
      "new_recovery_account",
      "extensions"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "escrow_transfer",
    "rules": {
      from: "account",
      to: "account",
      agent: "account",
    },
    "params": [
      "from",
      "to",
      "agent",
      "escrow_id",
      "sbd_amount",
      "steem_amount",
      "fee",
      "ratification_deadline",
      "escrow_expiration",
      "json_meta"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "escrow_dispute",
    "rules": {
      from: "account",
      to: "account",
      agent: "account",
    },
    "params": [
      "from",
      "to",
      "agent",
      "who",
      "escrow_id"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "escrow_release",
    "rules": {
      from: "account",
      to: "account",
      agent: "account",
    },
    "params": [
      "from",
      "to",
      "agent",
      "who",
      "receiver",
      "escrow_id",
      "sbd_amount",
      "steem_amount"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "escrow_approve",
    "rules": {
      from: "account",
      to: "account",
      agent: "account",
    },
    "params": [
      "from",
      "to",
      "agent",
      "who",
      "escrow_id",
      "approve"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "transfer_to_savings",
    "rules": {
      from: "account",
      to: "account",
      amount: "asset",
    },
    "params": [
      "from",
      "to",
      "amount",
      "memo"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "transfer_from_savings",
    "rules": {
      from: "account",
      to: "account",
      amount: "asset",
    },
    "params": [
      "from",
      "request_id",
      "to",
      "amount",
      "memo"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "cancel_transfer_from_savings",
    "rules": {
      from: "account",
    },
    "params": [
      "from",
      "request_id"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "custom_binary",
    "rules": {},
    "params": [
      "id",
      "data"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "decline_voting_rights",
    "rules": {
      account: "account",
    },
    "params": [
      "account",
      "decline"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "reset_account",
    "rules": {},
    "params": [
      "reset_account",
      "account_to_reset",
      "new_owner_authority"
    ]
  },
  {
    "roles": ["owner", "posting"],
    "operation": "set_reset_account",
    "rules": {
      account: "account",
      current_reset_account: "account",
      reset_account: "account",
    },
    "params": [
      "account",
      "current_reset_account",
      "reset_account"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "claim_reward_balance",
    "rules": {
      account: "account",
    },
    "params": [
      "account",
      "reward_steem",
      "reward_sbd",
      "reward_vests"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "delegate_vesting_shares",
    "rules": {
      delegator: "account",
      delegatee: "account",
      vesting_shares: "asset",
    },
    "params": [
      "delegator",
      "delegatee",
      "vesting_shares"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_create_with_delegation",
    "rules": {},
    "params": [
      "fee",
      "delegation",
      "creator",
      "new_account_name",
      "owner",
      "active",
      "posting",
      "memo_key",
      "json_metadata",
      "extensions"
    ]
  }
];
