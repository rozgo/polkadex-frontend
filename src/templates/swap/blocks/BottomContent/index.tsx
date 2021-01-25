import { webSocket } from 'components/dashboard/CustomChart/api/stream'

import * as S from './styles'
import Icon from 'components/general/Icon'
import React, { useEffect, useState } from 'react'
import Graph from '../Graph'
import SwapBox from '../Swapbox'
import SidebarDropdown from '../../../../components/general/SidebarDropdown'
import { Accordion, useAccordionToggle } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const BottomContent = ({ openCryptoListModal }) => {
  const [state, setState] = useState(false)
  const [orderBookBids, setOrderBookBids] = useState([])
  const [orderBookAsks, setOrderBookAsks] = useState([])
  const [lastTradePrice, setLastTradePrice] = useState(0)
  const [lastTradePriceType, setLastTradePriceType] = useState()
  const [openOrders, setOpenOrders] = useState([])
  const [volume, setVolume] = useState(0)
  const [blockPrice, setBlockPrice] = useState('0.00')
  const [high, setHigh] = useState(0)
  const [low, setLow] = useState(0)
  const [isAccordionActive, setIsAccordionActive] = useState(false)

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionToggle(eventKey, () => setIsAccordionActive(!isAccordionActive));

    return (
      <div onClick={decoratedOnClick} style={{cursor: 'pointer', display: 'flex', margin: 'auto'}}>
        {children}
      </div>
    );
  }

  const fetchOrderBookBids = (socket) => {
    socket.on('bids_levels', async (bid_levels) => {
      let currentOrderBook = []

      bid_levels.map(({ price, quantity }) => {
        currentOrderBook.push({
          id: currentOrderBook.length + 1,
          date: new Date(),
          pair: 'DOT',
          coin: 'BTC',
          side: 'buy',
          price: price,
          amount: quantity,
          total: quantity * price,
        })
      })
      await setOrderBookBids(currentOrderBook.sort((first, second) => second.price - first.price))
    })
  }
  const fetchOrderBookAsks = (socket) => {
    socket.on('asks_levels', async (ask_levels) => {
      let currentOrderBook = []

      ask_levels.map(({ price, quantity }) => {
        currentOrderBook.push({
          id: currentOrderBook.length + 1,
          date: new Date(),
          pair: 'DOT',
          coin: 'BTC',
          side: 'sell',
          price: price,
          amount: quantity,
          total: quantity * price,
        })
      })
      await setOrderBookAsks(currentOrderBook.sort((first, second) => second.price - first.price))
    })
  }
  const fetchMarketData = (socket) => {
    socket.on('market-data-stream', ({ volume, open, close, low, high }) => {
      const blockPriceValue = open === 0 ? 0 : (open - close) * 100 / open
      if (+blockPriceValue.toFixed(2) !== 0) {
        setBlockPrice(blockPriceValue.toFixed(2))
      }
      if (+high.toFixed(2) !== 0) {
        setHigh(high.toFixed(2))
      }
      if (+low.toFixed(2) !== 0) {
        setLow(low.toFixed(2))
      }
      setVolume(volume)
    })
  }
  const updateOpenOrders = order => {
    const finalOrders = [...openOrders, order]
    setOpenOrders(finalOrders)
  }

  useEffect(() => {
    const webSocketInstance = webSocket
    fetchMarketData(webSocketInstance)
    fetchOrderBookBids(webSocketInstance)
    fetchOrderBookAsks(webSocketInstance)
  }, [])

  return (
    <S.BottomContentWrapper>
      <S.LeftColumn>
        <S.IconColumn>
          <S.Marginbottom>
            <Icon source="Settings" size="Medium" background="Gray"/>
          </S.Marginbottom>
          <Icon source="Settings" size="Medium" background="Gray"/>
        </S.IconColumn>
        <S.LabelWithIcon>
          <S.IconWrapper>
            <Icon source="Wallet" size="Small" background="None"/>
          </S.IconWrapper>
          <span>Connect to wallet</span>
        </S.LabelWithIcon>
      </S.LeftColumn>
      <S.MiddleColumn>
        <SwapBox handleCryptoListModal={openCryptoListModal}/>

        <Accordion defaultActiveKey="1">
          <S.BottomLabel isAccordionActive={isAccordionActive}>
            <CustomToggle eventKey="0">
              <S.BottomTextWrapper>
                <S.Image src={`/img/icons/show_chart-white.svg`}/>
                <span>Pair Analytics</span>
                <SidebarDropdown rotation='rotate(0deg)'
                                 backgroundColor='#1C2023'
                                 hoverRotation='rotate(180deg)'
                                 icon='ArrowTop'/>
              </S.BottomTextWrapper>
            </CustomToggle>
          </S.BottomLabel>

          <Accordion.Collapse eventKey="0">
            <S.WrapperGraph>
              <Graph orderBookAsks={orderBookAsks}
                     orderBookBids={orderBookBids}
                     latestTransaction={lastTradePrice}
                     latestTransactionType={lastTradePriceType}/>
            </S.WrapperGraph>
          </Accordion.Collapse>
        </Accordion>
      </S.MiddleColumn>
      <S.RightColumn>
        <S.BottomRightContentWrapper>
          <S.BottomColor/> 1092049
        </S.BottomRightContentWrapper>
      </S.RightColumn>
    </S.BottomContentWrapper>
  )
}

export default BottomContent