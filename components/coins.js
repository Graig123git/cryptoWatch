import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import io from 'socket.io-client';

class Coins extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			searching: false,
			data: [],
			currentSearchValue: undefined,
		};
	}

	componentDidMount() {
		const socket = io.connect();
		console.info('conncted status', socket.connected);
		if (!socket.connected) {
			this.socket = new WebSocket('wss://velh1hmoid.execute-api.us-east-1.amazonaws.com/dev/');
		}

		this.socket.onmessage = (message) => {
			this.updateCoins(message.data);
		};
	}

	updateCoins = (message) => {
		const parseMessage = JSON.parse(message);
		this.setState({ data: parseMessafge });
	};

	getUrl = (name) => {
		// return url base on key
		if (name === 'Bitcoin') return 'https://specials-images.forbesimg.com/imageserve/1196863074/960x0.jpg?fit=scale';
		if (name == 'Ethereum')
			return 'data:image/jpeg;base64,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';
		if (name == 'Tether') return 'https://s2.coinmarketcap.com/static/img/coins/200x200/825.png';
		if (name == 'XRP') return 'https://static.coindesk.com/wp-content/uploads/2019/08/xrp-crypto-scaled.jpg';
		if (name == 'Bitcoin Cash') return 'https://upload.wikimedia.org/wikipedia/commons/5/58/Bitcoin_Cash.png';
		if (name == 'Bitcoin SV')
			return 'https://bitcoinexchangeguide.com/wp-content/uploads/2019/02/Bitcoin-SV-BSV-Releases-New-0-1-1-Update-to-Focus-on-Performance-and-Scaling-696x449.jpg';
		if (name == 'Litecoin') return 'https://static.coindesk.com/wp-content/uploads/2013/05/Litecoin-Logo-345x222.png';
		if (name == 'Binance Coin')
			return 'https://r5y5g3p7.rocketcdn.me/wp-content/uploads/2020/03/Binance-Coin-BNB-price-to-improve-with-Binance-Visa-card.jpg';
		if (name == 'EOS')
			return 'data:image/png;base64,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';
		if (name == 'Cardano')
			return 'https://www.crypto-news-flash.com/wp-content/uploads/2019/06/Stanslav-Cardano-1000x600.jpg';
	};

	renderSeparator = () => {
		return (
			<View
				style={{
					marginBottom: 15,
				}}
			/>
		);
	};

	searchDefault = async (e) => {};

	render() {
		const { searching, currentSearchValue } = this.state;
		if (this.state.loading) {
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator />
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<View>
					<StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />
				</View>
				<FlatList
					contentContainerStyle={{ width: '100%', padding: 15, marginTop: 8 }}
					data={this.state.data}
					renderItem={({ item }) => (
						<ListItem
							Component={TouchableScale}
							ViewComponent={LinearGradient}
							friction={150} //
							tension={200} //
							rightElement={<Text style={{ fontSize: 10 }}>{item.quote.USD.price} $US</Text>}
							containerStyle={styles.searchingcontainerStyle}
							activeScale={0.95} //
							linearGradientProps={{
								colors: ['#4db8ff', '#0fffff'],
								startPoint: { x: 1, y: 0 },
								endPoint: { x: 0.2, y: 0 },
							}}
							leftAvatar={{
								rounded: true,
								source: { uri: this.getUrl(item.name) },
							}}
							subtitleStyle={{
								color: '#000000',
								fontSize: 11,
							}}
							title={<Text style={{ fontSize: 10 }}>{item.name}</Text>}
							chevron={{ color: 'white' }}
						/>
					)}
					keyExtractor={(item) => item.name}
					ItemSeparatorComponent={this.renderSeparator}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		paddingTop: 30,
	},
	inputContainer: {
		padding: 8,
		width: '85%',
		alignSelf: 'center',
	},
	trendingText: {
		fontSize: 12,
		color: 'grey',
		textAlign: 'center',
	},

	trendingContainer: {
		marginBottom: 5,
	},
	likeCount: {
		textAlign: 'center',
		fontSize: 10,
		marginLeft: 5,
		color: 'white',
	},
	searchingcontainerStyle: {
		borderRadius: 25,
	},
});
export default Coins;
