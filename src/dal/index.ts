/**
 * Data Access Layer (DAL) - Main Entry Point
 */

// Export base repository
export { BaseRepository } from "../modules/base/BaseRepository";

// Export repositories
export {
  ChallengeRepository,
  challengeRepository,
} from "./respository/ChallengeRepository";

import { challengeRepository } from "./respository/ChallengeRepository";

/**
 * Main DAL object containing all repository instances
 */
export const dal = {
  challenge: challengeRepository,
};

export default dal;
