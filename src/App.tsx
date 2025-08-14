import { useEffect, useRef, useState } from 'react'

const second = 1000
// const minute = 60 * second
const minute = 5 * second
const duration = 2 * minute

function App() {
	const [counts, setCounts] = useState(0)
	const [timer, setTimer] = useState(duration)
	const [state, setState] = useState<'active' | 'pause' | 'stop'>('pause')
	const timeoutId = useRef<number>(undefined)

	useEffect(() => {
		if (state === 'active') {
			if (timer <= 0) {
				// For now just stop, then start next period
				setState('stop')
			} else {
				timeoutId.current = setTimeout(() => {
					setTimer(timer - second)
				}, second)
			}
		}

		if (state === 'pause') {
			clearTimeout(timeoutId.current)
		}

		if (state === 'stop') {
			clearTimeout(timeoutId.current)
			setTimer(duration)
		}
	}, [state, timer])

	const minutes = Math.trunc(timer / minute)
	const seconds = Math.trunc((timer % minute) / second)

	return (
		<div>
			<h2>{state}</h2>
			<div>timer: {timer}</div>
			<div>minutes: {minutes}</div>
			<div>seconds: {seconds}</div>
			<ul>
				{Array.from({ length: counts }).map((_, index) => (
					<li key={index}>{index}</li>
				))}
			</ul>
			<button type="button" onClick={() => setCounts(counts + 1)}>
				Add period
			</button>
			<button type="button" onClick={() => setCounts(counts - 1)}>
				Remove period
			</button>
			<button type="button" onClick={() => setState('active')}>
				Start
			</button>
			<button type="button" onClick={() => setState('pause')}>
				Pause
			</button>
			<button type="button" onClick={() => setState('stop')}>
				Stop
			</button>
		</div>
	)
}

export default App
