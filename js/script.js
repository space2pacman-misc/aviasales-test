Vue.component("filter-currency", {
	props: ["item"],
	methods: {
		getCurrencyValue() {
			this.$root.currency = this.$options.propsData.item.name;
			this.$root.currencyFullName = this.$options.propsData.item.fullName;
			this.$root.exchange = this.$options.propsData.item.exchange;
		}
	},
	template: "#filter-currency"
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
	template: "#filter-stops"
})

Vue.component("ticket", {
	props:["data"],
	data() {
		return {
			link: "https://pics.avs.io/120/35/",
			size: "@2x.png",
			days: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			months: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
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
    	},
    	getDate(value) {
    		value = value.split(".");
    		var date = new Date(value[1] + "." + value[0] + "." + value[2]);

    		return date.getDate() + " " + this.months[date.getMonth()] + " " + date.getFullYear() + ", " + this.days[date.getDay()];
    	}
    },
	template: "#ticket"
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