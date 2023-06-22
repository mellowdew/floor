<?php

namespace Drupal\diplom_block_news\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use \Drupal\Core\Entity\EntityManager;
use Drupal\Core\Entity\EntityInterface;
use Drupal\group\Entity\GroupInterface;

/**
 * Provides an example block.
 *
 * @Block(
 *   id = "diplom_block_news",
 *   admin_label = @Translation("DiplomNewsBlock"),
 *   category = @Translation("Custom")
 * )
 */

class NewsBlock extends BlockBase {
  public function build() {


    $data = null;

    $block = [

      '#theme' => 'diplom_block_news',
      '#data' => $data,
      
    ];
    return $block;
  }
}