class StateValue {
    val = null

    constructor(initialValue) {
        this.val = initialValue
    }

    get state(){
        return this.val
    }

    set state(state) {
        if (Object.is(state, this.state)) return
        this.state = state
    }
}

$.extend({
    useState: function(initialState, onStateChange = null){
        let machine = new StateValue(initialState)
        let sm = new Proxy(machine, {
            get: function(target, prop) {
                return target[prop];
            },
            set: function(target, prop, value) {
                const old = target[prop]
                target[prop] = value;
                if (typeof onStateChange === "function") {
                    onStateChange({
                        target,
                        prop,
                        oldVal: old,
                        newVal: value
                    })
                }
                return true;
            }
        });

        const setState = (newState) => {
            if (typeof newState === "object") {
                Object.keys(newState).forEach(key => {
                    sm[key] = newState[key];
                });
            } else {
                sm.val = newState;
            }

            return state()
        }

        const state = () => {
            if (Object.keys(sm).length === 1 && Object.keys(sm)[0] === "val") {
                return sm.val
            }
            return sm
        }

        return [
            state,
            setState,
            onStateChange
        ]
    }
})