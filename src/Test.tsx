import React from 'react'
import { Button } from '@components/ui/button'
import * as Icons from '@components/icons'
import Spinner from './components/ui/spinner/Spinner'
const Test = () => {
  return (
    <div>
        <Button variant='primary' size='lg' isLoading={false} icon={<Icons.Wifi/>} >  Click me</Button>
        <Button variant='secondary' size='md'>Click me</Button>
        <Button variant='danger' size='sm'>Click me</Button>
        <Button variant='success' size='xs'>Click me</Button>
        <Button variant='warning' size='xs'>Click me</Button>
        <Spinner variant='circle' size='lg'/>
    </div>
  )
}

export default Test