'use strict'

const schema = require('schema.js');

exports.saveTeam = teamDetails => new Promise ((resolve,reject) => {

  if(!'Email' in teamDetails && !'Turn' in teamDetails) {
    reject (new Error('Invalid Object!'))
  }

  const Team = new schema.Team(saveTeam)

  Team.save((err,docs) => {
		if(err) {
			console.log('error is here ')
			reject(err)
		}
		console.log(docs)
		resolve(docs)
	})
	.catch(err => {
		console.error(err)
	})
})
})
