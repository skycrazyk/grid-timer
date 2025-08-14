import { useEffect, useRef, useState } from 'react'

const second = 1000
// const minute = 60 * second
const minute = 5 * second
const duration = 2 * minute

const State = {
	active: 'active',
	pause: 'pause',
	stop: 'stop'
} as const

type State = (typeof State)[keyof typeof State]

function App() {
	const [counts, setCounts] = useState(0)
	const [timer, setTimer] = useState(duration)
	const [state, setState] = useState<State>(State.pause)
	const timeoutId = useRef<number>(undefined)

	useEffect(() => {
		if (state === State.active) {
			if (timer <= 0) {
				setCounts((counts) => counts - 1)
				setTimer(duration)
			} else {
				timeoutId.current = setTimeout(() => {
					setTimer(timer - second)
				}, second)
			}
		}

		if (state === State.pause) {
			clearTimeout(timeoutId.current)
		}

		if (state === State.stop) {
			clearTimeout(timeoutId.current)
			setTimer(duration)
		}
	}, [state, timer])

	useEffect(() => {
		if (counts <= 0) {
			setState(State.stop)
		}
	}, [counts])

	const minutes = Math.trunc(timer / minute)
	const seconds = Math.trunc((timer % minute) / second)

	return (
		<div>
			<h2>{state}</h2>
			<div>
				{counts ? minutes : 0} : {seconds}
			</div>
			<div></div>
			<button type="button" onClick={() => setCounts(counts + 1)}>
				Add period
			</button>
			<button
				type="button"
				onClick={() => setCounts(counts - 1)}
				disabled={!counts}
			>
				Remove period
			</button>
			<button
				type="button"
				onClick={() => setState(State.active)}
				disabled={state === State.active || !counts}
			>
				Start
			</button>
			<button
				type="button"
				onClick={() => setState(State.pause)}
				disabled={state !== State.active}
			>
				Pause
			</button>
			<button
				type="button"
				onClick={() => setState(State.stop)}
				disabled={state === State.stop}
			>
				Stop
			</button>
			<ul>
				{Array.from({ length: counts }).map((_, index) => (
					<li key={index}>{index}</li>
				))}
			</ul>
		</div>
	)
}

export default App
