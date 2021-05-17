
const delay=(number)=>{
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve
        }, number);
    })
}

const promisePoller=(options)=>{
    const {fn,interval} =options;
    const poll=()=>{
        fn();
        delay(interval).then(poll());
    }
    poll();
};

const _options = {
    fn:()=>{
        console.log(1);
    },
    interval:2000
};

promisePoller(_options);
