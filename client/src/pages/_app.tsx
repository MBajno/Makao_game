import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import { RoomProvider } from 'src/provider/roomProvider/roomProvider'
import { PlayerProvider } from 'src/provider/playerProvider/playerProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RoomProvider>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
    </RoomProvider>
  )  
}

export default MyApp
