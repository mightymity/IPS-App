import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class caretakerDetail extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        tel: PropTypes.string.isRequired,
        patient: PropTypes.string.isRequired
    }

    render() {
        return (
            <View>
                <Text> prop </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(caretakerDetail)
