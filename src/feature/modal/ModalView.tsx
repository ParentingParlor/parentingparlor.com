'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode, useEffect, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { ModalProvider } from '../modal/modalContext'

export default function ModalView(props: {
  children: ReactNode
  description?: ReactNode
  footer?: ReactNode
  onOpenedChange?: (props: { opened: boolean }) => void
  opened?: boolean
  title?: ReactNode
  trigger?: ReactNode
}) {
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    if (props.opened !== undefined) {
      setOpened(props.opened)
    }
  }, [props.opened])
  const trigger = props.trigger && (
    <DialogTrigger>
      <div className={buttonVariants({ variant: 'outline' })}>
        {props.trigger}
      </div>
    </DialogTrigger>
  )
  function dialogHandleOpenedChange(opened: boolean) {
    setOpened(opened)
    if (props.onOpenedChange) {
      props.onOpenedChange({ opened })
    }
  }
  function handleOpenedChange(props: { opened: boolean }) {
    dialogHandleOpenedChange(props.opened)
  }
  return (
    <ModalProvider opened={opened} onOpenChange={handleOpenedChange}>
      <Dialog open={opened} onOpenChange={dialogHandleOpenedChange}>
        {trigger}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          {props.children}
          <DialogFooter>{props.footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    </ModalProvider>
  )
}
