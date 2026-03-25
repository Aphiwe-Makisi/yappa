# Yappa

# Realtime Chat Application

A modern realtime messaging application built with **Angular** and **Firebase**.  
This project demonstrates scalable frontend architecture, realtime data synchronization, and best practices for building production-ready chat systems.

---

## Overview

This project implements a **realtime chat platform** where authenticated users can start conversations and exchange messages instantly.

The application uses **Firebase Authentication** for user identity and **Cloud Firestore** as the realtime database. Messages and conversations update automatically through Firestore listeners, allowing users to see new messages immediately without refreshing the page.

The project focuses on:

- Reactive programming with **RxJS**
- Feature-based **Angular architecture**
- Realtime data with **Firestore listeners**
- Clean service-based data access

---

## Features

### Authentication

- User authentication with Firebase
- Secure session handling
- Protected application routes

### Conversations

- View all conversations for the logged-in user
- Realtime updates to the conversation list
- Last message preview
- Participant detection

### Messaging

- Realtime message updates
- Chronological message ordering
- Automatic conversation updates when messages are sent

### User Profiles

- Firestore user documents linked to authentication accounts
- Profile information used to render conversation participants

---

## Tech Stack

### Frontend

- Angular
- TypeScript
- RxJS
- PrimeNG UI components

### Backend / Infrastructure

- Firebase Authentication
- Cloud Firestore
- Firebase Hosting

---

## Architecture

The project follows a **feature-based Angular architecture** with shared services located in a core layer.

```
src/app
│
├── core
│   └── services
│       ├── auth.service.ts
│       └── user.service.ts
│
├── features
│   ├── auth
│   ├── conversations
│   │   └── services
│   │       ├── chats.service.ts
│   │       └── message.service.ts
│   ├── chat
│   └── profile
│
└── shared
    └── components
```

### Design Principles

- Firebase logic lives inside **services**
- UI logic stays inside **feature modules**
- Components remain lightweight and reactive

---

## Firestore Data Model

### Users

```
users/
└── {uid}/
    ├── name
    ├── avatar
    ├── bio
    └── status
```

### Conversations

```
conversations/
└── {conversationId}/
    ├── participants: [uidA, uidB]
    ├── lastMessage
    ├── lastMessageTime
    └── createdAt
```

### Messages

```
conversations/
└── {conversationId}/
    └── messages/
        └── {messageId}/
            ├── senderId
            ├── text
            └── createdAt
```

Messages are stored as a **subcollection** of conversations to support large message histories and efficient realtime listeners.

---

## Deployment

The project can be deployed using **Firebase Hosting**.

Build the project:

```bash
ng build
```

Deploy:

```bash
firebase deploy
```

---

## Future Improvements

## Planned Features

### Core Chat Features

- [ ] Typing indicators
- [ ] Read receipts
- [ ] File and image sharing
- [ ] Group conversations
- [ ] Push notifications

### Messaging Features

- [ ] Message editing
- [ ] Message deletion (delete for me / delete for everyone)
- [ ] Message reactions (emoji reactions)
- [ ] Reply to specific messages (threaded replies)
- [ ] Message delivery states (sending, sent, delivered, read)
- [ ] Voice messages
- [ ] Video messages
- [ ] Message search within conversations

### Conversation Features

- [ ] Pin important conversations
- [ ] Archive conversations
- [ ] Mute notifications for specific chats
- [ ] Conversation search
- [ ] Conversation previews (last message + timestamp)

### User Presence & Activity

- [ ] Online / offline status
- [ ] Last seen indicator
- [ ] Typing indicators
- [ ] Activity status updates

Example statuses:

- Available
- Busy
- At work
- Offline

### User Profile Features

- [ ] Profile pictures
- [ ] Profile bio
- [ ] Custom status message
- [ ] User settings page

### Media & File Features

- [ ] Image preview thumbnails
- [ ] Document sharing
- [ ] Audio message sharing
- [ ] Video sharing
- [ ] Media gallery within conversations

### Notification Features

- [ ] Push notifications for new messages
- [ ] Notifications for mentions in group chats
- [ ] Notification settings per conversation
- [ ] In-app notification badges

### Group Chat Features

- [ ] Group creation
- [ ] Add / remove group members
- [ ] Group admin roles
- [ ] Group avatars
- [ ] Group description
- [ ] Mention users with `@username`

### Performance & Scalability

- [ ] Message pagination (load messages in batches)
- [ ] Infinite scroll for message history
- [ ] Optimistic UI updates (messages appear instantly)
- [ ] Local caching of conversations
- [ ] Offline support

### Moderation & Safety

- [ ] Block users
- [ ] Report users
- [ ] Leave group chats
- [ ] Restrict messaging from blocked users

### Developer / Architecture Improvements

- [ ] Advanced Firestore security rules
- [ ] Firestore indexing for optimized queries
- [ ] Modular Angular feature architecture
- [ ] Reactive state management with RxJS
- [ ] Logging and error monitoring

### Future Enhancements

- [ ] Message reactions summary
- [ ] Scheduled messages
- [ ] Polls in group chats
- [ ] Chat themes / custom UI
- [ ] End-to-end encryption

---

## Learning Goals

This project demonstrates:

- Realtime data handling with Firestore listeners
- Angular reactive architecture with RxJS
- Firebase backend integration (Auth, Firestore, Storage, Hosting)
- Secure Firestore data modeling and security rules
- Scalable chat system design
- Optimistic UI updates and local caching
- Push notification integration
- Media and file handling
- Modular Angular feature architecture
- Performance optimization (pagination, infinite scroll)
- User presence and activity tracking
- Group chat and permission management
- End-to-end encryption concepts
- Error monitoring and logging

---

## License

This project is for educational and demonstration purposes.
