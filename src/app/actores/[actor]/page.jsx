import { actores } from "@/data/actores";
import ActorClient from "./ActorClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return actores.map((a) => ({ actor: a.id }));
}

export async function generateMetadata({ params }) {
  const { actor: actorId } = await params;
  const actor = actores.find((a) => a.id === actorId);
  if (!actor) return {};
  return {
    title: `${actor.es.nombre} — Actores — ticker.uno`,
    description: actor.es.bio.slice(0, 155),
  };
}

export default async function ActorPage({ params }) {
  const { actor: actorId } = await params;
  const actor = actores.find((a) => a.id === actorId);
  if (!actor) notFound();
  return <ActorClient actor={actor} />;
}

