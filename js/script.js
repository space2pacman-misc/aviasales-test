Vue.component("filter-currency", {
	props: ["item"],
	methods: {
		getCurrencyValue() {
			this.$root.currency = this.$options.propsData.item.name;
			this.$root.currencyFullName = this.$options.propsData.item.fullName;
			this.$root.exchange = this.$options.propsData.item.exchange;
		}
	},
	template: `
		<label class="filter__currency" :class="{'filter__currency--active': this.$root.currency == item.name}">
			<div class="filter__currency-value">{{ item.name }}</div>
			<input type="radio" name="currency" :value="item.name" @change="getCurrencyValue()" hidden>
		</label>
	`
})

Vue.component("filter-stops", {
	props: ["item"],
	model: {
		prop: "checked",
		event: "change"
	},
	methods: {
		getStopValue() {
			var item = this.$options.propsData.item;
			var currentStop = this.$root.stops.current;

			currentStop.includes(item) ? currentStop.splice(currentStop.indexOf(item),1) : currentStop.push(item)
		},
		addDeclension(value) {
    		if(value !== 0) {
    			return value + " Пересад" + (value<5? (value>1)? "ки" : "ка" : "ок");	
    		 }
    	},
    	selectAllStops() {
    		this.$root.stops.current = this.$root.stops.current.length <= 3 ? [0,1,2,3] : [];
    	},
    	selectOnlyThisStops(value) {
    		this.$root.stops.current = [value];
    	}
	},
	template: `
		<div class="filter__stops">
			<label>
				<label class="filter__check-mark" :class="{'filter__check-mark--checked': this.$root.stops.current.includes(item) || this.$root.stops.current.length == 4}">
					<i class="icon-ok"></i>
					<input v-if="item != -1" type="checkbox" :value="item" @change="getStopValue()" hidden>
					<input v-if="item == -1" type="checkbox" @change="selectAllStops()" hidden>
				</label>
				<div class="filter___stops-caption">{{ item <= 0 ? item == -1 ? "Все" : "Без пересадок" : addDeclension(item) }}</div>
			</label>
			<div v-if="item != -1" class="filter__stops-only" @click="selectOnlyThisStops(item)">только</div>
		</div>
	`
})

Vue.component("ticket", {
	props:["data"],
	data() {
		return {
			link: "https://pics.avs.io/120/35/",
			size: "@2x.png"
		}
	},
 	methods: {
    	addDischarge(value) {
    		return value.toFixed().replace(/./g, function (n, i, s) {
                return (s.length - i) % 3 === 0 ? ' ' + n : n;
             })
    	},
    	addDeclension(value) {
    		if(value !== 0) {
    			return value + " Пересад" + (value<5? (value>1)? "ки" : "ка" : "ок");	
    		 }
    	}
    },
	template: `
		<div class="ticket">
			<div class="ticket__action">
				<img :src="link + data.carrier + size" class="ticket__company-logo">
				<button class="button">
					<div class="button__caption">Купить</div>
					<div class="button__value">за {{ addDischarge(data.price / this.$root.exchange) }}<i :class="'icon-' + this.$root.currencyFullName"></div>
				</button>
			</div>
			<div class="ticket__info">
				<div class="info__departure">
					<div class="info__time">{{ data.departure_time }}</div>
					<div class="info__destination">
						<div class="info__aeroport">{{ data.origin }}</div>,
						<div class="info__city">{{ data.origin_name }}</div>
					</div>
					<div class="info__date">9 окт 2018, Пт</div>
				</div>
				<div class="info__stops">{{ addDeclension(data.stops) }}</div>
				<div class="info__arrival">
					<div class="info__time">{{ data.arrival_time }}</div>
					<div class="info__destination">
						<div class="info__city">{{ data.destination_name }}</div>,
						<div class="info__aeroport">{{ data.destination }}</div>
					</div>
					<div class="info__date">10 окт 2018, Пт</div>
				</div>
			</div>
		</div>
	`
})

var app = new Vue({
    el: "#app",
    data: {
        tickets: tickets.tickets,
        currency: "rub",
        currencyFullName: "rouble",
        exchange: 1,
        stops: {
        	current: [0, 1],
        	values: [-1,0,1,2,3]
        }
    }
})