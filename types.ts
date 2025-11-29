import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface StatProps {
  label: string;
  value: string;
}

export interface StoryCardProps {
  image: string;
  caption: string;
}

export interface ResumeItemProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  colorClass: string;
}

export interface CampaignIdeaProps {
  title: string;
  description: string;
  image?: string;
}