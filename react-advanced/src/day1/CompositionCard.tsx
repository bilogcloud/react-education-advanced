import './Card.css'
import type { ComponentProps } from 'react'

function CardRoot(props: ComponentProps<'article'>) {
  return <article className="card" {...props} />
}

function CardHeader(props: ComponentProps<'header'>) {
  return <header className="card-header" {...props} />
}

function CardTitle(props: ComponentProps<'h3'>) {
  return <h3 className="card-title" {...props} />
}

function CardBody(props: ComponentProps<'div'>) {
  return <div className="card-body" {...props} />
}

function CardFooter(props: ComponentProps<'footer'>) {
  return <footer className="card-footer" {...props} />
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  Footer: CardFooter,
})
