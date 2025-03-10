import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Test = () => {
  const navigate = useNavigate()

  const getListAcvity = async () => {
    try {
      const res = await fetch('/api/method/frappe.desk.reportview.get')
      const data = await res.json()

      console.log('testtt', data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getListAcvity()
  }, [])
  return (
    <div>
      <Button onClick={() => navigate('/test2')}>Button</Button>
    </div>
  )
}

export default Test
