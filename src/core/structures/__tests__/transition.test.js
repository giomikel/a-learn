import { Transition } from '../fsm-transition.mjs';

test('check fsm transition initialization', () => {
    const transition = new Transition(0, '0', 1);
    expect(transition.fromState).toEqual(0);
    expect(transition.symbol).toEqual('0');
    expect(transition.toState).toEqual(1);
})
