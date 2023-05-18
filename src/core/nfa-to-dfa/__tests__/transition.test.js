import Transition from '../transition';

function testTransition() {
    const transition = new Transition(0, '0', 1);
    if (transition.fromState !== 0 ||
        transition.symbol !== '0' ||
        transition.toState !== 1
    ) {
        console.error('Transition initialization failed');
    } else {
        console.log('Transition initialization passed');
    }
}

testTransition();