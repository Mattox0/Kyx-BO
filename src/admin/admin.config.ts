import { ResourceOptions } from 'adminjs';
import { TruthDare } from '../truth-dare/entities/truth-dare.entity.js';
import { TruthDareMode } from '../truth-dare/entities/truth-dare-mode.entity.js';
import { Prefer } from '../prefer/entities/prefer.entity.js';
import { PreferMode } from '../prefer/entities/prefer-mode.entity.js';
import { NeverHave } from '../never-have/entities/never-have.entity.js';
import { NeverHaveMode } from '../never-have/entities/never-have-mode.entity.js';

const commonProperties = {
  id: {
    isVisible: { list: true, filter: true, show: true, edit: false },
  },
};

export const adminJsResources = [
  // ==================== Action et Vérité ====================
  {
    resource: TruthDareMode,
    options: {
      navigation: {
        name: 'Action ou Vérité',
        icon: 'Game',
      },
      id: 'AV - Modes',
      properties: {
        ...commonProperties,
        truthDares: {
          isVisible: { list: false, filter: false, show: true, edit: false },
        },
      },
    } as ResourceOptions,
  },
  {
    resource: TruthDare,
    options: {
      navigation: {
        name: 'Action ou Vérité',
        icon: 'Game',
      },
      id: 'AV - Questions',
      properties: {
        ...commonProperties,
        text: {
          type: 'textarea',
          isRequired: true,
        },
        genre: {
          availableValues: [
            { value: 'ALL', label: 'Tous' },
            { value: 'MALE', label: 'Homme' },
            { value: 'FEMALE', label: 'Femme' },
          ],
          isRequired: true,
        },
        type: {
          availableValues: [
            { value: 'ACTION', label: 'Action' },
            { value: 'VERITE', label: 'Vérité' },
          ],
          isRequired: true,
        },
        mode: {
          isVisible: true,
          reference: 'AV - Modes',
          isRequired: true,
        },
      },
      listProperties: ['text', 'type', 'genre', 'mode', 'createdDate'],
      filterProperties: ['text', 'type', 'genre', 'mode'],
      editProperties: ['text', 'type', 'genre', 'mode'],
      showProperties: ['id', 'text', 'type', 'genre', 'mode', 'createdDate', 'updatedDate'],
    } as ResourceOptions,
  },

  // ==================== Je n'ai jamais ====================
  {
    resource: NeverHaveMode,
    options: {
      navigation: {
        name: "Je n'ai jamais",
        icon: 'List',
      },
      id: "JNJ - Modes",
      properties: {
        ...commonProperties,
        neverHaves: {
          isVisible: { list: false, filter: false, show: true, edit: false },
        },
      },
    } as ResourceOptions,
  },
  {
    resource: NeverHave,
    options: {
      navigation: {
        name: "Je n'ai jamais",
        icon: 'List',
      },
      id: "JNJ - Questions",
      properties: {
        ...commonProperties,
        question: {
          type: 'textarea',
          isRequired: true,
        },
        mode: {
          isVisible: true,
          reference: 'JNJ - Modes',
          isRequired: true,
        },
      },
      listProperties: ['question', 'mode', 'createdDate'],
      filterProperties: ['question', 'mode'],
      editProperties: ['question', 'mode'],
      showProperties: ['id', 'question', 'mode', 'createdDate', 'updatedDate'],
    } as ResourceOptions,
  },

  // ==================== Tu préfères ====================
  {
    resource: PreferMode,
    options: {
      navigation: {
        name: 'Tu préfères',
        icon: 'Compare',
      },
      id: "TP - Modes",
      properties: {
        ...commonProperties,
        prefers: {
          isVisible: { list: false, filter: false, show: true, edit: false },
        },
      },
    } as ResourceOptions,
  },
  {
    resource: Prefer,
    options: {
      navigation: {
        name: 'Tu préfères',
        icon: 'Compare',
      },
      id: "TP - Questions",
      properties: {
        ...commonProperties,
        choiceOne: {
          type: 'textarea',
          isRequired: true,
        },
        choiceTwo: {
          type: 'textarea',
          isRequired: true,
        },
        mode: {
          isVisible: true,
          reference: 'TP - Modes',
          isRequired: true,
        },
      },
      listProperties: ['choiceOne', 'choiceTwo', 'mode', 'createdDate'],
      filterProperties: ['choiceOne', 'choiceTwo', 'mode'],
      editProperties: ['choiceOne', 'choiceTwo', 'mode'],
      showProperties: ['id', 'choiceOne', 'choiceTwo', 'mode', 'createdDate', 'updatedDate'],
    } as ResourceOptions,
  },
];

export const adminJsBranding = {
  companyName: 'Kyx Admin',
  logo: false as const,
  softwareBrothers: false,
};